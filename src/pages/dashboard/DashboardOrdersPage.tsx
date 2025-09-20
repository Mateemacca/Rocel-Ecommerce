import { TableOrdersAdmin } from "../../components/dashboard";
import { Loader } from "../../components/shared/Loader";
import { useAllOrders } from "../../hooks";

export const DashboardOrdersPage = () => {
  const { data, isLoading } = useAllOrders();

  return (
    <div className="space-y-5">
      <h1 className="text-2xl font-bold">Ordenes</h1>
      {isLoading || !data ? <Loader /> : <TableOrdersAdmin orders={data} />}
    </div>
  );
};
