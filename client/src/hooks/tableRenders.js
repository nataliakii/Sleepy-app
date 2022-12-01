export const conditionalTableHead = (ww3, ww4, ww5) => {
  if (ww5) {
    return (
      <>
        <th>Wake window 1</th>
        <th>Wake window 2</th>
        <th>Wake window 3</th>
        <th>Wake window 4</th>
        <th>Wake window 5</th>
        <th>Sum Nap</th>
      </>
    );
  }
  if (ww4) {
    return (
      <>
        <th>Wake window 1</th>
        <th>Wake window 2</th>
        <th>Wake window 3</th>
        <th>Wake window 4</th>
        <th>Sum Nap</th>
      </>
    );
  }

  if (ww3) {
    return (
      <>
        <th>Wake window 1</th>
        <th>Wake window 2</th>
        <th>Wake window 3</th>
        <th>Sum Nap</th>
      </>
    );
  }

  return (
    <>
      <th>Wake window 1</th>
      <th>Wake window 2</th>
      <th>Sum Nap</th>
    </>
  );
};

export const conditionalTableRow1 = (ww1, ww2, ww3, ww4, ww5, sumNap) => {
  if (ww5) {
    return (
      <>
        <td>{ww1}mins</td>
        <td>{ww2}mins</td>
        <td>{ww3}mins </td>
        <td>{ww4}mins</td>
        <td>{ww5}mins</td>
        <td>{sumNap}mins</td>
      </>
    );
  }
  if (ww4) {
    return (
      <>
        <td>{ww1}mins</td>
        <td>{ww2}mins</td>
        <td>{ww3}mins </td>
        <td>{ww4}mins</td>
        <td>{sumNap}mins</td>
      </>
    );
  }

  if (ww3) {
    return (
      <>
        <td>{ww1}mins</td>
        <td>{ww2}mins</td>
        <td>{ww3}mins </td>
        <td>{sumNap}mins</td>
      </>
    );
  }

  return (
    <>
      <td>{ww1}mins</td>
      <td>{ww2}mins</td>
      <td>{sumNap}mins</td>
    </>
  );
};
export const conditionalCellColor = (string) => {
  if (string.length === 2) {
    return 'ok-cell';
  }
  return 'no-ok-cell';
};

export const conditionalTableRow2 = (
  ww3,
  ww4,
  ww5,
  ww1R,
  ww2R,
  ww3R,
  ww4R,
  ww5R,
  sumNapR
) => {
  if (ww5) {
    return (
      <>
        <td className={conditionalCellColor(ww1R)}>{ww1R}</td>
        <td className={conditionalCellColor(ww2R)}>{ww2R}</td>
        <td className={conditionalCellColor(ww3R)}>{ww3R} </td>
        <td className={conditionalCellColor(ww4R)}>{ww4R}</td>
        <td className={conditionalCellColor(ww5R)}>{ww5R}</td>
        <td className={conditionalCellColor(sumNapR)}>{sumNapR}</td>
      </>
    );
  }
  if (ww4) {
    return (
      <>
        <td className={conditionalCellColor(ww1R)}>{ww1R}</td>
        <td className={conditionalCellColor(ww2R)}>{ww2R}</td>
        <td className={conditionalCellColor(ww3R)}>{ww3R} </td>
        <td className={conditionalCellColor(ww4R)}>{ww4R}</td>
        <td className={conditionalCellColor(sumNapR)}>{sumNapR}</td>
      </>
    );
  }

  if (ww3) {
    return (
      <>
        <td className={conditionalCellColor(ww1R)}>{ww1R}</td>
        <td className={conditionalCellColor(ww2R)}>{ww2R}</td>
        <td className={conditionalCellColor(ww3R)}>{ww3R} </td>
        <td className={conditionalCellColor(sumNapR)}>{sumNapR}</td>
      </>
    );
  }
  return (
    <>
      <td className={conditionalCellColor(ww1R)}>{ww1R}</td>
      <td className={conditionalCellColor(ww2R)}>{ww2R}</td>
      <td className={conditionalCellColor(sumNapR)}>{sumNapR}</td>
    </>
  );
};
