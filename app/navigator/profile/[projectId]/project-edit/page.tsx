"use client";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "@/redux/store";
import { getProjects, updateProject } from "@/redux/actions/projectActions";
import { Project } from "@/redux/reducers/projectReducer";
import { useToast } from "@/components/ui/use-toast";

const getCompanyId = () => {
  return localStorage.getItem("companyId");
};

export default function ProjectPage() {
  const { toast } = useToast();
  const dispatch = useDispatch<AppDispatch>();
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [formData, setFormData] = useState({
    projectName: "",
    projectCode: "",
    address: "",
    logo: "",
  });

  useEffect(() => {
    const companyId = getCompanyId();
    if (companyId) {
      dispatch(getProjects(companyId));
    }
  }, [dispatch]);

  const projects = useSelector((state: RootState) => state.projects.projects);

  const handleSelectChange = (projectId: string) => {
    const project = projects.find((p) => p._id === projectId);
    if (project) {
      setSelectedProject(project);
      setFormData({
        projectName: project.projectName,
        projectCode: project.projectCode,
        address: project.address,
        logo: project.logo,
      });
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    if (!selectedProject) return;

    const updatedData = {
      ...formData,
      projectId: selectedProject._id,
    };

    const actionResult = await dispatch(updateProject(updatedData));
    if (updateProject.fulfilled.match(actionResult)) {
      toast({
        title: "Başarılı",
        description: "Proje başarıyla güncellendi.",
      });
    } else if (updateProject.rejected.match(actionResult)) {
      toast({
        title: "Hata",
        description: actionResult.payload as React.ReactNode,
        variant: "destructive",
      });
    }
  };

  return (
    <div>
      <div className="pb-5 flex flex-row justify-between gap-4">
        <div className="pb-5">
          <h5>Proje Düzenle</h5>
          <p className="text-muted-foreground font-normal text-sm">
            Projenizi düzenleyebilir ve inceleyebilirsiniz.
          </p>
        </div>
        <Button className="flex gap-2 text-xs" onClick={handleSubmit}>
          Kaydet
        </Button>
      </div>
      <div className="grid grid-cols-3 gap-4 py-5 border-b">
        <div className="pb-5">
          <p className="font-bold text-sm">Projeyi Seçin</p>
          <p className="text-muted-foreground font-normal text-xs">
            Projeyi düzenlemek için Seçin.
          </p>
        </div>
        <Select onValueChange={handleSelectChange}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Lütfen Proje Seçin" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Projeler</SelectLabel>
              {projects.map((project) => (
                <SelectItem key={project._id} value={project._id}>
                  {project.projectName}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
      {/* Project */}
      <div className="grid grid-cols-3 gap-4 pt-20 py-5 border-b">
        <div className="pb-5">
          <p className="font-bold text-sm">Proje Adı</p>
          <p className="text-muted-foreground font-normal text-xs">
            Proje adını düzenleyebilir veya değiştirebilirsiniz.
          </p>
        </div>
        <Input
          name="projectName"
          onChange={handleChange}
          placeholder={formData.projectName || "Belirtilmemiş"}
          className="w-[300px]"
        />
      </div>
      <div className="grid grid-cols-3 gap-4 py-5 border-b">
        <div className="pb-5">
          <p className="font-bold text-sm">Proje Kodu</p>
          <p className="text-muted-foreground font-normal text-xs">
            Proje Kodunu düzenleyebilir veya değiştirebilirsiniz.
          </p>
        </div>
        <Input
          name="projectCode"
          onChange={handleChange}
          placeholder={formData.projectCode || "Belirtilmemiş"}
          className="w-[300px]"
        />
      </div>
      <div className="grid grid-cols-3 gap-4 py-5 border-b">
        <div className="pb-5">
          <p className="font-bold text-sm">Adres</p>
          <p className="text-muted-foreground font-normal text-xs">
            Adresinizi düzenleyebilir veya değiştirebilirsiniz.
          </p>
        </div>
        <Textarea
          name="address"
          onChange={handleChange}
          placeholder={formData.address || "Belirtilmemiş"}
        />
      </div>
    </div>
  );
}
