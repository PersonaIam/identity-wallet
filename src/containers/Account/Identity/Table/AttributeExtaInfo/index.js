/**
 * Created by vladtomsa on 12/11/2018
 */
import React, { Component } from 'react';
import Associations from '../AttributeAssociations';
import AttributeTimeline from '../AttributeTimeline';

class AttributeExtraData extends Component {
  render() {
    const { t, userAttribute } = this.props;

    return (
      <div>
        <AttributeTimeline {...userAttribute} t={t}/>
        <Associations
          associations={userAttribute.attributeAssociations}
          t={t}
        />
      </div>
    );
  }
}

export default AttributeExtraData;
