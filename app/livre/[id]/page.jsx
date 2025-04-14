import livres from "../../../components/data/livre";

const Livre = ({ params }) => {
  const livre = livres.find((livre) => livre.id === parseInt(params.id));

  if (!livre) {
    return <div>Livre non trouvé</div>;
  }

  return (
    <div>
      <iframe
        key={livre.id}
        src={livre.chemin}
        width="100%"
        height="1000px"
        style={{ border: "none" }}
      />
    </div>
  );
};

export default Livre;
