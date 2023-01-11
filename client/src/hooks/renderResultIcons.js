import { TfiAngleDoubleDown, TfiAngleDoubleUp } from "react-icons/tfi";
import { CgYinyang } from "react-icons/cg";
import { TiHeart } from "react-icons/ti";

export default function icons(code) {
  if (code === 200) {
    return <TiHeart />;
  }
  if (code === 500) {
    return <TfiAngleDoubleDown />;
  }
  if (code === 400) {
    return <TfiAngleDoubleUp />;
  }
  return null;
}
