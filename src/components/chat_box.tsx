export default function ChatBox({
  time,
  text,
}: {
  time: string;
  text: string;
}) {
  return (
    <div className="rounded-xl bg-gray-50 border p-4 flex flex-col gap-2">
      <div className="text-sm text-gray-500">{time}</div>
      <div className="text-base leading-7">{text}</div>
    </div>
  );
}
