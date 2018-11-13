/**
 * Created by vladtomsa on 12/11/2018
 */
import React, { Component } from 'react';
import Associations from '../AttributeAssociations';
import AttributeTimeline from '../AttributeTimeline';

class AttributeExtraData extends Component {
  // state = {
  //   activeTab: 0,
  // };
  //
  // handleChange = (event, value) => {
  //   this.setState({ activeTab: value });
  // };

  // componentDidMount() {
  //   const { userAttribute } = this.props;
  //
  //   if (!userAttribute.expire_timestamp) {
  //     this.setState({activeTab: 1});
  //   }
  // }

  render() {
    // const { activeTab } = this.state;
    const { t, userAttribute } = this.props;

    // const renderCurrentTab = () => {
    //   switch (activeTab) {
    //     case 0:
    //       return <AttributeTimeline {...userAttribute} t={t}/>;
    //     case 1:
    //       return (
    //         <Associations
    //           associations={userAttribute.attributeAssociations}
    //           t={t}
    //         />
    //       );
    //   }
    // };

    return (
      <div>
        <AttributeTimeline {...userAttribute} t={t}/>
        <Associations
          associations={userAttribute.attributeAssociations}
          t={t}
        />

        {/*{ renderCurrentTab() }*/}

        {/*<AppBar position="static" color="inherit">*/}
          {/*<Tabs value={activeTab} onChange={this.handleChange}>*/}
            {/*<Tab label={t('TIMELINE')} disabled={!userAttribute.expire_timestamp} />*/}
            {/*<Tab label={t('ASSOCIATIONS')} disabled={!(userAttribute.attributeAssociations && userAttribute.attributeAssociations.length)} />*/}
          {/*</Tabs>*/}
        {/*</AppBar>*/}
      </div>
    );
  }
}

export default AttributeExtraData;
