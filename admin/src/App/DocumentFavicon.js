import React from 'react';
import { Helmet } from 'react-helmet';
import WorkspaceFavicon from '../Containers/Workspace/WorkspaceFavicon';

export const DocumentFavicon = () => <WorkspaceFavicon container={Helmet} />;

export default DocumentFavicon;
