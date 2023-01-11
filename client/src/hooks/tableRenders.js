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
        <td>{ww1}</td>
        <td>{ww2}</td>
        <td>{ww3} </td>
        <td>{ww4}</td>
        <td>{ww5}</td>
        <td>{sumNap}</td>
      </>
    );
  }
  if (ww4) {
    return (
      <>
        <td>{ww1}</td>
        <td>{ww2}</td>
        <td>{ww3} </td>
        <td>{ww4}</td>
        <td>{sumNap}</td>
      </>
    );
  }

  if (ww3) {
    return (
      <>
        <td>{ww1}</td>
        <td>{ww2}</td>
        <td>{ww3} </td>
        <td>{sumNap}</td>
      </>
    );
  }

  return (
    <>
      <td>{ww1}</td>
      <td>{ww2}</td>
      <td>{sumNap}</td>
    </>
  );
};
export const conditionalCellColor = (string) => {
  if (!string) {
    return "";
  }
  if (string.length !== 2) {
    return "no-ok-cell";
  }
};
export const cellCol = (code) => {
  if (!code) {
    return "";
  }
  if (code === 400 || code === 500) {
    return "no-ok-cell";
  }
};

export const conditionalTableRow2 = (
  ww1R,
  ww2R,
  ww3R,
  ww4R,
  ww5R,
  sumNapR,
  lastNapR,
  numberOfNapsR
) => {
  if (ww5R) {
    return (
      <>
        <td className={conditionalCellColor(ww1R)}>{ww1R}</td>
        <td className={conditionalCellColor(ww2R)}>{ww2R}</td>
        <td className={conditionalCellColor(ww3R)}>{ww3R} </td>
        <td className={conditionalCellColor(ww4R)}>{ww4R}</td>
        <td className={conditionalCellColor(ww5R)}>{ww5R}</td>
        <td className={conditionalCellColor(sumNapR)}>{sumNapR}</td>
        <td className={conditionalCellColor(lastNapR)}>{lastNapR}</td>
        <td className={conditionalCellColor(numberOfNapsR)}>{numberOfNapsR}</td>
      </>
    );
  }
  if (ww4R) {
    return (
      <>
        <td className={conditionalCellColor(ww1R)}>{ww1R}</td>
        <td className={conditionalCellColor(ww2R)}>{ww2R}</td>
        <td className={conditionalCellColor(ww3R)}>{ww3R} </td>
        <td className={conditionalCellColor(ww4R)}>{ww4R}</td>
        <td className={conditionalCellColor(sumNapR)}>{sumNapR}</td>
        <td className={conditionalCellColor(lastNapR)}>{lastNapR}</td>
        <td className={conditionalCellColor(numberOfNapsR)}>{numberOfNapsR}</td>
      </>
    );
  }

  if (ww3R) {
    return (
      <>
        <td className={conditionalCellColor(ww1R)}>{ww1R}</td>
        <td className={conditionalCellColor(ww2R)}>{ww2R}</td>
        <td className={conditionalCellColor(ww3R)}>{ww3R} </td>
        <td className={conditionalCellColor(sumNapR)}>{sumNapR}</td>
        <td className={conditionalCellColor(lastNapR)}>{lastNapR}</td>
        <td className={conditionalCellColor(numberOfNapsR)}>{numberOfNapsR}</td>
      </>
    );
  }
  return (
    <>
      <td className={conditionalCellColor(ww1R)}>{ww1R}</td>
      <td className={conditionalCellColor(ww2R)}>{ww2R}</td>
      <td className={conditionalCellColor(sumNapR)}>{sumNapR}</td>
      <td className={conditionalCellColor(lastNapR)}>{lastNapR}</td>
      <td className={conditionalCellColor(numberOfNapsR)}>{numberOfNapsR}</td>
    </>
  );
};
