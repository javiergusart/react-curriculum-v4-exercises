export default function SnackList() {
  const snacks = [
    { name: 'Protein Shakes', rank: 5 },
    { name: 'Plantain Chips', rank: 4 },
    { name: 'Granola Bites', rank: 3 },
    { name: 'Protein Bars', rank: 2 },
    { name: 'Peta Chips', rank: 1 },
  ];

  const sortedSnacks = snacks.toSorted((firstSnack, secondSnack) => {
    return firstSnack.rank - secondSnack.rank;
  });

  return (
    <ul>
      {sortedSnacks.map((snack) => (
        <li key={snack.name}>
          {snack.rank}. {snack.name}
        </li>
      ))}
    </ul>
  );
}
