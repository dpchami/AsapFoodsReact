import React from 'react';
import { connect } from 'react-redux';


import KitchensList from './List';
import ComponentWithHeader from '../componentWithHeader';


import getKitchens from '../../actions/getKitchens';

const mapStateToProps = (state) => {
  return {
    kitchens: state.kitchens,
    user: state.user,
    plates: state.plates,
  };
};
const mapDispatchToProps = dispatch => ({
  getKitchens(authToken) {
    return getKitchens(authToken, dispatch);
  },
});

class KitchensContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            kitchens: [],
            loading: true,
        };
    }

    async componentDidMount() {
        // if kitchens list has not been loaded to store
        // call getKitchens action
        const { kitchens } = this.props;
        console.log('KITCHEN PROPS');
        console.log(this.props);
        if (kitchens.length < 1) {
            const { getKitchens, user } = this.props;
            const { auth_token: authToken } = user.details;

            // the state should be reset after the kitchens
            // list is feched from the sever and the store updated
            try {
                const kitchens = await getKitchens(authToken);

                console.table(kitchens);
                this.setState({ kitchens, loading: false });
            } catch (error) {
                console.error(error);
                this.setState({ kitchens: [], loading: false });
            }
        } else this.setState({ kitchens, loading: false }); // load from store and setState*/
    }

    render() {
        const { kitchens, loading } = this.state;
        return (
          <div>
            <ComponentWithHeader
              headerProps={{
                        title: "Pick kitchen",
                        showBack: false,
                    }}
              Component={() => loading
                ? (
                  <div id="load" style={{ backgroundColor: "transparent", opacity: 0.9 }}>
                    <div className="lds-ellipsis">
                      <div />
                      <div />
                      <div />
                      <div />
                    </div>
                  </div>
                )
                : <KitchensList kitchens={kitchens} />}
            />
          </div>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(KitchensContainer);
