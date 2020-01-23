export function serverLetterToClientLetter(serverLetter) {
  return {
    id: serverLetter.id,
    name: serverLetter.name,
    surname: serverLetter.surname,
    city: serverLetter.city,
    country: serverLetter.country
  };
}
