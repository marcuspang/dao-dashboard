import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CacheKey } from "@/constants/cache";
import Link from "next/link";
import { useQuery } from "wagmi";

export default function Home() {
  const { data } = useQuery([CacheKey.DAOS], () =>
    fetch("/api/daos").then((res) => res.json())
  );

  console.log(data?.data?.ranking?.items);

  return (
    <div className="grid grid-cols-3 gap-4 w-full">
      {data?.data?.ranking?.items?.map((item: any) => (
        <Card key={item.id}>
          <CardHeader>
            <CardTitle>
              <Link href={`/dao/${item.id}`} className="hover:underline">
                {item.name}
              </Link>
            </CardTitle>
            <CardDescription>
              {item.website?.length && (
                <Link
                  href={item.website}
                  target="_blank"
                  className="hover:underline"
                >
                  {item.website}
                </Link>
              )}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p>No. of Proposals: {item.proposalsCount.toLocaleString()}</p>
            <p>Voting Power: {item.votesCount.toLocaleString()}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
