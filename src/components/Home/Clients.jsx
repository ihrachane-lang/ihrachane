import { getClients } from "@/lib/data/public-data";
import ClientsMarquee from "./ClientsMarquee";

export default async function Clients() {
  const clients = await getClients();

  return <ClientsMarquee clients={clients} />;
}
