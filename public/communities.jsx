useEffect(() => {
  fetch("http://localhost:3000/communities")
    .then(res => res.json())
    .then(data => setCommunities(data));
}, []);

{communities.map(c => (
  <div key={c.id} onClick={() => navigate(`/community/${c.name}`)}>
    <h2>{c.name}</h2>
    <p>{c.description}</p>
  </div>
))}

