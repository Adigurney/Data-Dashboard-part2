import { useParams } from "react-router-dom";

function SpellDetail({ spells }) {
  const { id } = useParams();
  const spell = spells.find(s => s.index === id);

  if (!spell) return <div className="loading glass">Spell not found...</div>;

  return (
    <div className="glass table-container">
      <h2>{spell.name}</h2>
      <p><strong>Level:</strong> {spell.level}</p>
      <p><strong>School:</strong> {spell.school.name}</p>
      <p><strong>Range:</strong> {spell.range}</p>
      <p><strong>Duration:</strong> {spell.duration}</p>
      <p><strong>Casting Time:</strong> {spell.casting_time}</p>
      <p><strong>Concentration:</strong> {spell.concentration ? "Yes" : "No"}</p>
      <p><strong>Ritual:</strong> {spell.ritual ? "Yes" : "No"}</p>
      <p><strong>Components:</strong> {spell.components.join(", ")}</p>
      <p><strong>Description:</strong> {spell.desc.join(" ")}</p>
    </div>
  );
}

export default SpellDetail;