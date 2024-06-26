import CardImageSkeleton from "../components/skeletons/card-skeleton";
import { CardListGrid } from "../components/grids";

const TestPage = () => {
  return (
    <div className="mx-5">
      <CardListGrid
        items={Array.from({ length: 6 }).map(() => ({}))}
        render={() => <CardImageSkeleton.Image />}
      />
    </div>
  );
};

export default TestPage;
