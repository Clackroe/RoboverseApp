import { useRouter } from "next/router";

export default function Match() {
  const router = useRouter();
  const match = router.query.match;

  return <div>Hello {match}</div>;
}
