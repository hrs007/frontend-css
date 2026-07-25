export default function TaskCard({ content }) {
  return (
    <div className="bg-white p-3 rounded-lg shadow-sm border border-slate-200 cursor-pointer hover:border-blue-400 group transition-colors">
      {/* Use the dynamic content prop here */}
      <p className="text-sm text-slate-700 mb-3 leading-snug">{content}</p>
      
      {/* You can leave the styling for the assignees/labels as static HTML for now */}
    </div>
  );
}