import { useEffect, useMemo, useState } from "react";
import "./App.css";
const Shape = ({ data }) => {
  const [active, setActive] = useState(new Set());
  const [deactivating, setDeactivating] = useState(false);
  const flatData = useMemo(() => data.flat(Infinity), [data]);
  const visibleBoxesCount = useMemo(
    () =>
      flatData.reduce(
        (acc, el) => (el === 1 ? ((acc += 1), acc) : (acc, acc)),
        0,
      ),
    [],
  );
  const clickHandler = (e) => {
    const { target } = e;
    const status = target.getAttribute("data-status");
    const index = target.getAttribute("data-index");
    if (!status || !index || active.has(index) || deactivating) {
      return;
    }
    setActive((prev) => new Set(prev.add(index)));
  };
  const deactiveBox = () => {
    const keys = Array.from(active.keys());
    const removeKey = () => {
      if (keys.length) {
        setDeactivating(true);
        const currentKey = keys.shift();
        setActive((prev) => {
          const updatedKeys = new Set(prev);
          updatedKeys.delete(currentKey);
          return updatedKeys;
        });
        setTimeout(removeKey, 500);
      } else {
        setDeactivating(false);
      }
    };
    setTimeout(removeKey, 100);
  };
  useEffect(() => {
    if (active.size >= visibleBoxesCount) {
      deactiveBox();
    }
  }, [active]);
  return (
    <div
      style={{ gridTemplateColumns: `repeat(${data[0].length},1fr)` }}
      className="boxes"
      onClick={clickHandler}
    >
      {flatData.map((item, i) => {
        const status = item === 1 ? "visible" : "hidden";
        return (
          <div
            key={`${item}-${i}`}
            className={`box ${status} ${active.has(i.toString()) && "selected"} ${deactivating && "deactivating"}`}
            data-index={i}
            data-status={status}
          />
        );
      })}
    </div>
  );
};
export default Shape;
