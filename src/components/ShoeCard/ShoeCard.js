import React from 'react';
import styled from 'styled-components/macro';

import { COLORS, WEIGHTS } from '../../constants';
import { formatPrice, pluralize, isNewShoe } from '../../utils';
import Spacer from '../Spacer';

const ShoeCard = ({
  slug,
  name,
  imageSrc,
  price,
  salePrice,
  releaseDate,
  numOfColors,
}) => {

  const isOnSale = typeof salePrice === 'number'; 

  const variant = isOnSale
    ? 'on-sale'
    : isNewShoe(releaseDate)
      ? 'new-release'
      : 'default'

  return (
    <Link href={`/shoe/${slug}`}>
      <Wrapper>
        <ImageWrapper>
          {variant === 'on-sale' ? (
            <SaleFlag>
              Sale
            </SaleFlag>
            ) : 
            variant === 'new-release' && (
              <NewFlag>
                Just Released!
              </NewFlag>
            )}
          <Image alt="" src={imageSrc} />
        </ImageWrapper>
        <Spacer size={12} />
        <Row>
          <Name>{name}</Name>
          <Price isStriked={isOnSale}>{formatPrice(price)}</Price>
        </Row>
        <Row>
          <ColorInfo>{pluralize('Color', numOfColors)}</ColorInfo>
          {isOnSale && (<SalePrice>{formatPrice(salePrice)}</SalePrice>)}
        </Row>
      </Wrapper>
    </Link>
  );
};

const Link = styled.a`
  text-decoration: none;
  color: inherit;
`;

const Wrapper = styled.article``;

const ImageWrapper = styled.div`
  position: relative;
`;

const Flag = styled.div`
  position: absolute;
  top: 12px;
  right: -4px;
  height: 2rem;
  display: flex;
  align-items: center;
  padding-inline: 10px;
  border-radius: 2px;
  color: ${COLORS.white};
  font-size: ${14 / 16}rem;
  font-weight: ${WEIGHTS.bold};
`;

const SaleFlag = styled(Flag)`
  background-color: ${COLORS.primary};
`;
const NewFlag = styled(Flag)`
  background-color: ${COLORS.secondary};
`;

const Image = styled.img`
  width: 100%;
  line-height: 0;
  border-radius: 16px 16px 4px 4px;
`;

const Row = styled.div`
  font-size: 1rem;
  display: flex;
  justify-content: space-between;
`;

const Name = styled.h3`
  font-weight: ${WEIGHTS.medium};
  color: ${COLORS.gray[900]};
`;

const Price = styled.span`
  text-decoration: ${props => props.isStriked ? 'line-through' : 'none'};
  color: ${props => props.isStriked ? COLORS.gray[700] : 'inherit'};
`;

const ColorInfo = styled.p`
  color: ${COLORS.gray[700]};
`;

const SalePrice = styled.span`
  font-weight: ${WEIGHTS.medium};
  color: ${COLORS.primary};
`;

export default ShoeCard;
