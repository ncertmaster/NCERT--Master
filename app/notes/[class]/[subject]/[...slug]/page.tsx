export default function NotesPage({
  params,
}: {
  params: {
    class: string;
    subject: string;
    slug: string[];
  };
}) {
  return (
    <div>
      <h1>Class: {params.class}</h1>
      <h2>Subject: {params.subject}</h2>
    </div>
  );
}
