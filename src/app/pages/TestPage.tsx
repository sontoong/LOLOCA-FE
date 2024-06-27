import CardImageSkeleton from "../components/skeletons/card-skeleton";
import { CardListGrid } from "../components/grids";

const TestPage = () => {
  return (
    <div className="mx-5">
      <h1>ABC</h1>
      <CardListGrid.Horizontal
        items={10}
        render={() => <CardImageSkeleton.Image />}
      />
    </div>
  );
};

export default TestPage;
