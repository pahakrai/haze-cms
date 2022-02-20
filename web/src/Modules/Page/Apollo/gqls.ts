import { gql } from "@apollo/client";
export const QUERY_PAGE_PARAM = () => gql`
  query ParamPageMeta {
    paramPageMeta
  }
`;
export const QUERY_PAGE_BY_PATH = (fields = PAGE_ITEM_FIELDS) => gql`
  query PageByPath($path: String!) {
    pageByPath(path: $path) {
      _id
      ${fields}
    }
  }
`;
export const QUERY_PAGE_SEO = (fields = PAGE_ITEM_FIELDS) => gql`
  query PageSeo($path: String!) {
    pageSeo(path: $path) {
      _id
      ${fields}
    }
  }
`;

export const PAGE_ITEM_FIELDS = `
    title
    content
    path
    meta{
      og_url
      og_image
      description
      version
    }
    layout{
      content
    }
    isActive
`;

export const QUERY_PAGES_BY_PATH = (fields = PAGE_ITEM_FIELDS) => gql`
  query PagesByPath($paths: [String!]) {
    pagesByPath(paths: $paths) {
      _id
      ${fields}
    }
  }
`;
