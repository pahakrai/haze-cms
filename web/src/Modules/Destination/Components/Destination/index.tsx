// DISPLAY(HOME|PRODUCTS) PAGES
import DestinationCardBase from "./DestinationCardBase";

interface DestinationCardProps {
  regions?: IDestinations;
  authed?: boolean;
  thumbnail?: boolean;
}
export const DestinationCard = ({
  regions,
  thumbnail = true
}: DestinationCardProps) => {
  return (
    <DestinationCardBase
      image={
        thumbnail
          ? regions?.filemeta?.thumbnailUri || regions?.filemeta?.uri
          : regions?.filemeta?.uri
      }
      name={regions.name}
    />
  );
};

export default DestinationCard;
