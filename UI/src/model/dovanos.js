export function serverDovanaToClientDovana(serverDovana) {
  return {
    title: serverDovana.title,
    id: serverDovana.id,
    description: serverDovana.description,
    forAdults: serverDovana.forAdults,
    image: serverDovana.img,
    type: serverDovana.type
  };
}
