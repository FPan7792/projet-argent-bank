import '../styles/index.css';

export interface Props {
  item: HomeFeatureItem;
  icon : string
}
export const HomeReinsurance = ( props: Props ) => {
  const { item, icon } = props

  return (
    <div className="feature-item">
        <img src={icon.includes(item.imgIcon) ? icon : ''} alt={item.imgAlt} className="feature-icon" />
        <h3 className="feature-item-title">{item.itemTitle}</h3>
        <p>
          {item.itemDescription}
        </p>
    </div>
  );
};
export default HomeReinsurance;
