import { Container } from "@/components/ui/container";
import PasteView from "@/components/PasteView";
import PasteNotFound from "@/components/PasteNotFound";
// import { db } from "@/lib/db"; // Adjust this import based on your project structure

type Props = {
  params: { slug: string }
  searchParams: { [key: string]: string | string[] | undefined }
}

const PastePage = async ({ params }: { params: { slug: string } }) => {
//   const gotPaste = await db.paste.findUnique({
//     where: {
//       slug: params.slug,
//     },
//   });
    const gotPaste = {"id":"1","slug":"hello-world","title":"Hello, World!","content":"console.log('Hello, World!');","syntax":"javascript","user":"admin","views":0,"created_at":"2022-01-01T00:00:00.000Z"};

  return (
    <>
        {gotPaste ? (
            <PasteView paste={gotPaste} />
        ) : (
            <PasteNotFound />
        )}
        </>
  );
};

export default PastePage;