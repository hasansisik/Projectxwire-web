"use client";
import * as z from "zod";
import { useToast } from "@/components/ui/use-toast";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState, useRef } from "react";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "@/redux/store";
import { getPlan, getPins, createPin } from "@/redux/actions/planActions";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { MapPin, Pencil, Type } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { getAllUsers } from "@/redux/actions/userActions";
import { createTask, CreateTaskPayload } from "@/redux/actions/taskActions";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const getCompanyId = () =>
  typeof window !== "undefined" ? localStorage.getItem("companyId") : null;

const formSchema = z.object({
  taskTitle: z.string().nonempty("Plan kodu zorunludur"),
  taskCategory: z.string().nonempty("Plan kategori zorunludur"),
  persons: z.any(),
});

export default function PlanDetails() {
  const dispatch = useDispatch<AppDispatch>();
  const { toast } = useToast();
  const router = useRouter();
  const companyId = getCompanyId();
  const searchParams = useSearchParams();
  const planId = searchParams.get("planId");

  const { user, users } = useSelector((state: RootState) => state.user);
  const plan = useSelector((state: RootState) => state.plans.plan);
  const pins = useSelector((state: RootState) => state.plans.pins);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [mode, setMode] = useState<"draw" | "text" | "pin" | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [pendingPin, setPendingPin] = useState<{ x: number; y: number } | null>(
    null
  );

  const fetchPins = async () => {
    if (planId) await dispatch(getPins(planId));
  };

  useEffect(() => {
    if (planId) {
      dispatch(getPlan(planId));
      fetchPins();
    }
  }, [dispatch, planId]);

  useEffect(() => {
    if (companyId) {
      dispatch(getAllUsers(companyId));
    } else {
      console.error("Company ID is null");
    }
  }, [companyId, dispatch]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      taskTitle: "",
      taskCategory: "",
      persons: "",
    },
  });

  const handleDraw = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (mode === "draw" && canvasRef.current) {
      const ctx = canvasRef.current.getContext("2d");
      if (ctx) {
        ctx.fillStyle = "black";
        ctx.fillRect(e.nativeEvent.offsetX, e.nativeEvent.offsetY, 2, 2);
      }
    }
  };

  const handleText = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (mode === "text" && canvasRef.current) {
      const ctx = canvasRef.current.getContext("2d");
      if (ctx) {
        const text = prompt("Yazmak istediğiniz metni girin:");
        if (text) {
          ctx.fillStyle = "black";
          ctx.font = "16px Arial";
          ctx.fillText(text, e.nativeEvent.offsetX, e.nativeEvent.offsetY);
        }
      }
    }
  };

  const handlePin = async (e: React.MouseEvent) => {
    e.stopPropagation();
    if (mode === "pin" && canvasRef.current) {
      setIsDialogOpen(true);

      const canvas = canvasRef.current;
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const { width, height } = canvas;
      const scaleX = width / rect.width;
      const scaleY = height / rect.height;
      const pinWidth = 24;
      const pinHeight = 30;
      const adjustedX = x - pinWidth / 2;
      const adjustedY = y - pinHeight / 2;
      const pinX = ((adjustedX * scaleX) / width) * 100;
      const pinY = ((adjustedY * scaleY) / height) * 100;

      setPendingPin({ x: pinX, y: pinY });
    }
  };

  const handleSubmit = async (data: z.infer<typeof formSchema>) => {
    const url = new URL(window.location.href);
    const pathSegments = url.pathname.split("/");
    const projectId = pathSegments[pathSegments.indexOf("plan") + 1];
    const payload: CreateTaskPayload = {
      ...data,
      projectId: projectId || "",
      taskCreator: user._id,
      persons: data.persons,
      plan: planId || null,
    };

    const actionResult = await dispatch(createTask(payload));

    if (createTask.fulfilled.match(actionResult)) {
      if (actionResult.payload && pendingPin) {
        toast({
          title: "Görev Oluşturuldu",
          description: "Başarıyla görev oluşturuldu.",
        });
        setIsDialogOpen(false);
        const taskId = actionResult.payload._id;

        await dispatch(
          createPin({
            planId: plan._id,
            x: pendingPin.x,
            y: pendingPin.y,
            task: taskId,
          })
        );

        setPendingPin(null);
        await fetchPins();
      } else {
        toast({
          title: "Görev Oluşturulamadı",
          description: "Geçersiz yanıt formatı.",
          variant: "destructive",
        });
      }
    } else if (createTask.rejected.match(actionResult)) {
      toast({
        title: "Görev Oluşturulamadı",
        description: actionResult.payload as React.ReactNode,
        variant: "destructive",
      });
    }
  };

  const tooltips = [
    {
      icon: <MapPin />,
      text: "Pin Ekle",
      onClick: () => setMode("pin"),
      modeValue: "pin",
    },
  ];

  const handlePinClick = (taskId: string) => {
    const url = new URL(window.location.href);
    const pathSegments = url.pathname.split("/");
    const projectId = pathSegments[pathSegments.indexOf("plan") + 1];
    router.push(`/navigator/task/${projectId}/details/?taskId=${taskId}`);
  };

  return (
    <div>
      <div className="pb-5">
        <h4>Plan Detayları</h4>
        <p className="text-muted-foreground font-normal text-sm">
          Planlarınızı buradan inceleyebilir, ekleyebilir ve arama
          yapabilirsiniz.
        </p>
      </div>
      <div className="flex flex-row justify-between gap-5">
        <div>
          <h6>Proje Adı: {plan.planName}</h6>
          <p className="text-muted-foreground font-normal text-sm pb-5">
            Plan Kodu: {plan.planCode} , Plan Kategori : {plan.planCategory}
          </p>
          <div className="flex flex-row justify-between gap-5">
            <div
              style={{
                width: "900px",
                height: "700px",
                overflow: "hidden",
                border: "1px solid #ccc",
                position: "relative",
              }}
            >
              <TransformWrapper
                limitToBounds={true}
                minScale={0.5}
                maxScale={4}
                centerOnInit={true}
              >
                <TransformComponent>
                  <div style={{ position: "relative" }}>
                    <img
                      src={plan.planImages}
                      alt="Plan"
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                      }}
                    />
                    <canvas
                      ref={canvasRef}
                      width={1000}
                      height={700}
                      style={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                      }}
                      onClick={
                        mode === "text"
                          ? handleText
                          : mode === "pin"
                          ? handlePin
                          : handleDraw
                      }
                    />
                    {pins.map((pin, index) => (
                      <div
                        key={index}
                        style={{
                          position: "absolute",
                          left: `${pin.x}%`,
                          top: `${pin.y}%`,
                          transform: "translate(-50%, -50%)",
                        }}
                        onClick={() => handlePinClick(pin.task._id)}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 30"
                          fill="none"
                          width="24"
                          height="30"
                        >
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M12 12C13.6569 12 15 10.6569 15 9C15 7.34315 13.6569 6 12 6C10.3431 6 9 7.34315 9 9C9 10.6569 10.3431 12 12 12Z"
                            fill="red"
                          />
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M12 22C15 22 20 14.4183 20 10C20 5.58172 16.4183 2 12 2C7.58172 2 4 5.58172 4 10C4 14.4183 9 22 12 22ZM16.2675 15.2202C17.3398 13.2872 18 11.3235 18 10C18 6.68629 15.3137 4 12 4C8.68629 4 6 6.68629 6 10C6 11.3499 6.68682 13.3658 7.79716 15.3358C8.62357 14.2077 9.87268 13 12 13C14.0518 13 15.5373 14.1153 16.2675 15.2202Z"
                            fill="red"
                          />
                        </svg>
                      </div>
                    ))}
                  </div>
                </TransformComponent>
              </TransformWrapper>
            </div>
            <div className="flex flex-col gap-5">
              <TooltipProvider>
                {tooltips.map((tooltip, index) => (
                  <Tooltip key={index}>
                    <TooltipTrigger asChild>
                      <Button
                        onClick={tooltip.onClick}
                        variant={
                          mode === tooltip.modeValue ? "default" : "outline"
                        }
                      >
                        {tooltip.icon}
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>{tooltip.text}</p>
                    </TooltipContent>
                  </Tooltip>
                ))}
              </TooltipProvider>
            </div>
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Görev Ekle</DialogTitle>
                  <DialogDescription>
                    Görev eklemek için gerekli bilgileri giriniz.
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <Form {...form}>
                    <form
                      className="flex flex-col gap-4"
                      onSubmit={form.handleSubmit(handleSubmit)}
                    >
                      <FormField
                        control={form.control}
                        name="taskTitle"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Görev İsmi</FormLabel>
                            <FormControl>
                              <Input placeholder="Görev Başlığı" {...field} />
                            </FormControl>
                            <FormDescription>
                              Görev Başlığı Girin
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="taskCategory"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Görev Kategorisi</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="Görev Kategorisi"
                                {...field}
                              />
                            </FormControl>
                            <FormDescription>
                              Görev Kategorisi Girin
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="persons"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Kişi Seç</FormLabel>
                            <FormControl>
                              <Select
                                onValueChange={field.onChange}
                                value={field.value}
                              >
                                <SelectTrigger>
                                  <SelectValue placeholder="Kişi Seç" />
                                </SelectTrigger>
                                <SelectContent>
                                  {users.map((user) => (
                                    <SelectItem key={user._id} value={user._id}>
                                      {user.name}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <DialogFooter>
                        <Button type="submit">Görev Ekle</Button>
                      </DialogFooter>
                    </form>
                  </Form>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>
        <div>
          <h6>Görev Detayları</h6>
          <p className="text-muted-foreground font-normal text-xs pb-5">
            Görevlere eklenmiş pinleri buradan inceleyebilir, ekleyebilir ve arama yapabilirsiniz.
          </p>
          <Table>
            <TableCaption>Bu plana ait görevler.</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">Id</TableHead>
                <TableHead>Başlık</TableHead>
                <TableHead>Kategori</TableHead>
                <TableHead className="text-right">Tarih</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {pins.map((pin) => (
                <TableRow
                  key={pin?.task?._id}
                  onClick={() => handlePinClick(pin?.task?._id)}
                >
                  <TableCell className="font-medium">
                  {pin?.task?.number}
                  </TableCell>
                  <TableCell>{pin?.task?.taskTitle}</TableCell>
                  <TableCell>{pin?.task?.taskCategory}</TableCell>
                  <TableCell className="text-right">
                  {new Date(pin?.task?.createdAt).toLocaleDateString()}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}
