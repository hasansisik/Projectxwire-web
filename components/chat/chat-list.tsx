import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "next/navigation";
import { getTaskMessages } from "@/redux/actions/taskActions";
import { RootState, AppDispatch } from "@/redux/store";
import { AnimatePresence, motion } from "framer-motion";
import { Avatar, AvatarImage } from "../ui/avatar";
import Image from "next/image";
import ChatBottombar from "./chat-bottombar";
import { cn } from "@/lib/utils";
import Lightbox from "@/components/Lightbox";

export function ChatList() {
  const messagesContainerRef = useRef<HTMLDivElement>(null);
  const dispatch = useDispatch<AppDispatch>();
  const messages = useSelector((state: RootState) => state.tasks.messages);
  const user = useSelector((state: RootState) => state.user.user);
  const searchParams = useSearchParams();
  const taskId = searchParams.get("taskId") || "";

  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [lightboxImages, setLightboxImages] = useState<string[]>([]);
  const [photoIndex, setPhotoIndex] = useState(0);

  useEffect(() => {
    if (taskId) {
      dispatch(getTaskMessages(taskId));
    }
  }, [dispatch, taskId]);

  useEffect(() => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTop =
        messagesContainerRef.current.scrollHeight;
    }
  }, [messages]);

  const handleImageClick = (images: string[], index: number) => {
    const allImages = messages.flatMap((message) => message.files || []);
    setLightboxImages(allImages);
    setPhotoIndex(allImages.indexOf(images[index]));
    setIsLightboxOpen(true);
  };

  return (
    <div className="w-full overflow-y-auto overflow-x-hidden h-full flex flex-col">
      <div
        ref={messagesContainerRef}
        className="w-full overflow-y-auto overflow-x-hidden h-full flex flex-col"
      >
        <AnimatePresence>
          {messages?.map((message, index) => (
            <motion.div
              key={index}
              layout
              initial={{ opacity: 0, scale: 1, y: 50, x: 0 }}
              animate={{ opacity: 1, scale: 1, y: 0, x: 0 }}
              exit={{ opacity: 0, scale: 1, y: 1, x: 0 }}
              transition={{
                opacity: { duration: 0.1 },
                layout: {
                  type: "spring",
                  bounce: 0.3,
                  duration: messages.indexOf(message) * 0.05 + 0.2,
                },
              }}
              className={cn(
                "flex flex-col gap-2 p-4 whitespace-pre-wrap",
                message.sender && user && message.sender._id === user._id
                  ? "items-end"
                  : "items-start"
              )}
            >
              <div className="flex gap-3 items-center">
                {message.sender && message.sender._id !== user._id && (
                  <Avatar className="flex justify-center items-center">
                    <AvatarImage
                      src={message.sender.picture}
                      alt={message.sender.name}
                      width={6}
                      height={6}
                    />
                  </Avatar>
                )}
                {message.content ? (
                  <span className="bg-accent p-3 rounded-md max-w-xs">
                    {message.content}
                  </span>
                ) : (
                  message.files &&
                  message.files.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-2">
                      {message.files.map((file: string, fileIndex: number) => (
                        <Image
                          key={fileIndex}
                          src={file}
                          alt={`file-${fileIndex}`}
                          width={200}
                          height={200}
                          className="rounded-md"
                          onClick={() =>
                            handleImageClick(message.files, fileIndex)
                          }
                        />
                      ))}
                    </div>
                  )
                )}
                {message.sender && message.sender._id === user._id && (
                  <Avatar className="flex justify-center items-center">
                    <AvatarImage
                      src={message.sender.picture}
                      alt={message.sender.name}
                      width={6}
                      height={6}
                    />
                  </Avatar>
                )}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
      {taskId && (
        <ChatBottombar taskId={taskId} userId={user._id} isMobile={false} />
      )}
      {isLightboxOpen && (
        <Lightbox
          images={lightboxImages}
          photoIndex={photoIndex}
          closeLightbox={() => setIsLightboxOpen(false)}
        />
      )}
    </div>
  );
}
