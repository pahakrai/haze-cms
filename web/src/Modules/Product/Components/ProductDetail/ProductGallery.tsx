import { makeStyles } from "@material-ui/core";
import React, { useMemo } from "react";
import ImageGallery from "react-image-gallery";

// $gallery-mobile-width: calc(100vw - 30px);
// .gallery {
//   :global(.image-gallery-image) {
//     height: 415px;
//     object-fit: contain;
//   }
//   :global(.image-gallery-slide) {
//     img {
//       height: 415px;
//       object-fit: contain;
//     }
//   }
//   @include media-breakpoint-up(md) {
//     :global(.image-gallery-right-nav),
//     :global(.image-gallery-left-nav) {
//       display: none;
//     }
//   }
//   @include media-breakpoint-down(sm) {
//     :global(.image-gallery-image) {
//       height: $gallery-mobile-width;
//     }
//     :global(.image-gallery-slide) {
//       img {
//         height: $gallery-mobile-width;
//       }
//     }
//     :global(.image-gallery-thumbnails-wrapper) {
//       display: none;
//     }
//     :global(.image-gallery-slide-wrapper) {
//       width: 100%;
//     }
//   }
//   :global(.image-gallery-thumbnail.active) {
//     :global(.image-gallery-thumbnail-image) {
//       box-shadow: 0 0px 6px rgba(0, 0, 0, 0.1);
//     }
//   }
//   .thumbnail {
//     height: 72px;
//     margin-bottom: 20px;
//     padding: 0 2px !important;
//     & > div {
//       height: 100%;
//       img {
//         height: 100%;
//         object-fit: contain;
//       }
//     }
//   }
// }
const useClasses = makeStyles((theme) => ({
  gallery: {
    "@global .image-gallery-image": {
      height: 415,
      objectFit: "contain"
    },
    "@global .image-gallery-slide img": {
      height: 415,
      objectFit: "contain"
    },
    "@global .image-gallery-thumbnail.active .image-gallery-thumbnail-image": {
      boxShadow: "0 0px 6px rgba(0, 0, 0, 0.1)"
    }
  },
  [theme.breakpoints.up("md")]: {
    gallery: {
      "@global .image-gallery-right-nav,.image-gallery-left-nav": {
        display: "none"
      }
    }
  },
  [theme.breakpoints.down("sm")]: {
    gallery: {
      "@global .image-gallery-image": {
        height: "calc(100vw - 30px)"
      },
      "@global .image-gallery-slide img": {
        height: "calc(100vw - 30px)"
      },
      "@global .image-gallery-thumbnails-wrapper": {
        display: "none"
      },
      "@global .image-gallery-slide-wrapper": {
        width: "100%"
      }
    }
  },
  thumbnail: {
    height: 72,
    marginBottom: 20,
    padding: "0 2px !important",
    "& > div": {
      height: "100%",
      img: {
        height: "100%",
        objectFit: "contain"
      }
    }
  }
}));

interface ProductGalleryProps {
  product?: IProduct;
}
export const ProductGallery = ({ product }: ProductGalleryProps) => {
  const classes = useClasses();
  const images = useMemo(
    () =>
      (product?.images || []).map((image) => ({
        thumbnailClass: classes.thumbnail,
        original: image.uri,
        thumbnail: image.thumbnailUri || image.uri
      })),
    [product]
  );
  return (
    <ImageGallery
      // additionalClass={classes.gallery}
      items={images}
      // renderItem={renderItem}
      autoPlay={false}
      thumbnailPosition="left"
      showFullscreenButton={false}
      showPlayButton={false}
      showBullets={false}
      showNav
    />
  );
};
