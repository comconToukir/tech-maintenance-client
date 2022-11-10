import { Helmet } from "react-helmet";

const MetaData = ({ title }) => {
  return (
    <Helmet>
      <title>{`${title ? title + ' - Tech Maintenance' : 'Tech Maintenance'}`}</title>
    </Helmet>
  );
};

export default MetaData;