import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "@/redux/store";
import { addMessageToTask, addPersonToTask } from "@/redux/actions/taskActions";
import { ChatInput } from "../ui/chatInput";
import { EmojiPicker } from "../emoji-picker";
import { SendHorizontal, ThumbsUp, FileImage, UserPlus } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { buttonVariants } from "../ui/button";
import { cn } from "@/lib/utils";
import { storage } from "@/config";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogClose,
} from "../ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { getAllUsers } from "@/redux/actions/userActions";
import io from "socket.io-client";

const socket = io("http://localhost:3050");

interface ChatBottombarProps {
  taskId: string;
  userId: string;
  isMobile: boolean;
}

const getCompanyId = () => {
  return localStorage.getItem("companyId");
};

export const BottombarIcons = [{ icon: FileImage }, { icon: UserPlus }];

export default function ChatBottombar({
  taskId,
  userId,
  isMobile,
}: ChatBottombarProps) {
  const dispatch = useDispatch<AppDispatch>();
  const [message, setMessage] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewURL, setPreviewURL] = useState<string | null>(null);
  const [isUserDialogOpen, setIsUserDialogOpen] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const users = useSelector((state: RootState) => state.user.users);

  const companyId = getCompanyId();

  useEffect(() => {
    if (companyId) {
      dispatch(getAllUsers(companyId));
    } else {
      console.error("Company ID is null");
    }
  }, [companyId, dispatch]);

  useEffect(() => {
    socket.emit("join_room", taskId);

    socket.on("receive_message", (message) => {
      dispatch(addMessageToTask(message));
    });

    return () => {
      socket.emit("leave_room", taskId);
      socket.off("receive_message");
    };
  }, [taskId, dispatch]);

  const handleInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = event.target.value;
    setMessage(value);
    if (value.includes("@")) {
      setIsUserDialogOpen(true);
      setMessage(""); 
    }
  };

  const uploadLogoToFirebase = async (file: File): Promise<string> => {
    const storageRef = ref(storage, `PlanwireFile/${file.name}`);
    await uploadBytes(storageRef, file);
    const downloadURL = await getDownloadURL(storageRef);
    return downloadURL;
  };

  const handleSend = async () => {
    let fileURL = null;
    if (selectedFile) {
      fileURL = await uploadLogoToFirebase(selectedFile);
    }
    if (message.trim() || fileURL) {
      const payload: any = {
        taskId: taskId as string,
        senderId: userId,
        files: fileURL ? [fileURL] : [],
        room: taskId,
      };
      if (!fileURL) {
        payload.content = message.trim();
      }
      dispatch(addMessageToTask(payload) as any);
      socket.emit("send_message", payload);
      setMessage("");
      setSelectedFile(null);
      setPreviewURL(null);
    }
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      handleSend();
    }

    if (event.key === "Enter" && event.shiftKey) {
      event.preventDefault();
      setMessage((prev) => prev + "\n");
    }
  };

  const handleThumbsUp = () => {
    const payload = {
      taskId,
      content: "👍",
      senderId: userId,
      files: [],
    };
    dispatch(addMessageToTask(payload) as any);
    socket.emit("send_message", payload); 
    setMessage("");
  };

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      setSelectedFile(file);
      setPreviewURL(URL.createObjectURL(file));
    }
  };

  const handleUserSelect = async () => {
    if (selectedUserId) {
      try {
        const selectedUser = users.find((user) => user._id === selectedUserId);
        if (selectedUser) {
          await dispatch(
            addPersonToTask({ taskId, userId: selectedUserId }) as any
          );
          await dispatch(
            addMessageToTask({
              taskId,
              senderId: userId,
              content: `@${selectedUser.name}`,
              files: [],
            }) as any
          );
        }
        setIsUserDialogOpen(false);
        setSelectedUserId(null);
      } catch (error) {
        console.error("Kullanıcı eklenirken hata oluştu:", error);
      }
    }
  };

  return (
    <div className="p-2 flex flex-row justify-between w-full items-center gap-2">
      {!message.trim() && !isMobile && (
        <div className="flex">
          {BottombarIcons.map((icon, index) => (
            <Link
              key={index}
              href="#"
              className={cn(
                buttonVariants({ variant: "ghost", size: "icon" }),
                "h-9 w-9",
                "dark:bg-muted dark:text-muted-foreground dark:hover:bg-muted dark:hover:text-white"
              )}
              onClick={() => {
                if (icon.icon === FileImage && fileInputRef.current) {
                  fileInputRef.current.click();
                } else if (icon.icon === UserPlus) {
                  setIsUserDialogOpen(true);
                }
              }}
            >
              <icon.icon size={20} className="text-muted-foreground" />
            </Link>
          ))}
        </div>
      )}

      {previewURL && (
        <Dialog open={!!previewURL} onOpenChange={() => setPreviewURL(null)}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Dosya Önizlemesi</DialogTitle>
              <DialogClose />
            </DialogHeader>
            <img src={previewURL} alt="Preview" className="max-w-full h-auto" />
            <DialogFooter>
              <button
                onClick={handleSend}
                className={cn(
                  buttonVariants({ variant: "ghost", size: "icon" })
                )}
              >
                <SendHorizontal size={20} className="text-muted-foreground" />
              </button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}

      <div className="w-full relative">
        <ChatInput
          autoComplete="off"
          value={message}
          ref={inputRef}
          onKeyDown={handleKeyPress}
          onChange={handleInputChange}
          name="message"
          placeholder="Aa"
          className=" w-full border rounded-full flex items-center h-9 resize-none overflow-hidden bg-background"
        ></ChatInput>
        <div className="absolute right-2 bottom-0.5">
          <EmojiPicker
            onChange={(value) => {
              setMessage(message + value);
              if (inputRef.current) {
                inputRef.current.focus();
              }
            }}
          />
        </div>
      </div>

      <Link
        href="#"
        className={cn(
          buttonVariants({ variant: "ghost", size: "icon" }),
          "h-9 w-9",
          "dark:bg-muted dark:text-muted-foreground dark:hover:bg-muted dark:hover:text-white shrink-0"
        )}
        onClick={message.trim() || selectedFile ? handleSend : handleThumbsUp}
      >
        {message.trim() || selectedFile ? (
          <SendHorizontal size={20} className="text-muted-foreground" />
        ) : (
          <ThumbsUp size={20} className="text-muted-foreground" />
        )}
      </Link>

      <input
        type="file"
        ref={fileInputRef}
        style={{ display: "none" }}
        onChange={handleFileChange}
      />

      {/* Selected Persons */}
      <Dialog open={isUserDialogOpen} onOpenChange={setIsUserDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Kullanıcı Seç</DialogTitle>
            <DialogClose />
          </DialogHeader>
          <Select onValueChange={(value) => setSelectedUserId(value)}>
            <SelectTrigger>
              <SelectValue placeholder="Bir kullanıcı seçin" />
            </SelectTrigger>
            <SelectContent>
              {users.map((user) => (
                <SelectItem key={user._id} value={user._id}>
                  {user.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <DialogFooter>
            <Button variant="outline" onClick={handleUserSelect}>
              Kişiyi Ekle
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
