const shortAddress = (str) => {
  return str.split(",").slice(0, 2).join(",");
};

export default function Distance({ leg, children }) {
  if (!leg.distance || !leg.duration) return null;
  const endAddress = shortAddress(leg.end_address);
  return (
    <div style={{ marginBottom: "10px" }}>
      Distance to playground at {endAddress} -{" "}
      <a className="art-color">{leg.distance.text}</a>
      <div>
        That would take <span className="art-color">{leg.duration.text}</span>{" "}
        if walking{" "}
      </div>
      {children}
    </div>
  );
}
