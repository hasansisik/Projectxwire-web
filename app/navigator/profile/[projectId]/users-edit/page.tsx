"use client";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "@/redux/store";
import { DataTable } from "@/components/tables/data-table";
import { useEffect } from "react";
import { getAllUsers } from "@/redux/actions/userActions";
import { columns } from "@/components/tables/columns";

export default function UsersEditPage() {
  const dispatch = useDispatch<AppDispatch>();
  const {users} = useSelector((state: RootState) => state.user);

  const getCompanyId = () => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("companyId");
    }
    return null;
  };
  const companyId = getCompanyId();

  useEffect(() => {
    if (companyId) {
      dispatch(getAllUsers(companyId));
    } else {
      console.error("Company ID is null");
    }
  }, [companyId, dispatch]);

  return (
    <>
      <div className="pb-5 flex flex-row justify-between gap-4">
        <div className="pb-2">
          <h5>Personel Düzenleme</h5>
          <p className="text-muted-foreground font-normal text-sm">
            Personel bilgilerini düzenleyebilirsiniz.
          </p>
        </div>
      </div>
      <DataTable data={users} columns={columns} />
    </>
  );
}
