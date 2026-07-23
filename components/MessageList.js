import MessageItem from "@/components/MessageItem";

export default function MessageList({ messages }) {
  return (
    <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
      <div className="px-5 py-4 border-b border-slate-100">
        <h2 className="font-semibold text-slate-800">
          Messages ({messages.length})
        </h2>
      </div>

      <div className="divide-y divide-slate-100">
        {messages.map((msg) => (
          <MessageItem key={msg.id} message={msg} />
        ))}
      </div>
    </div>
  );
}
