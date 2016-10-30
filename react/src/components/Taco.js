import React, { Component } from 'react';

class Taco extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      mixin: '',
      condiment: '',
      base: '',
      recipeMixin: '',
      recipeCondiment: '',
      recipeBase: ''
    }
  }

  componentDidMount() {
    $.ajax({
      method: 'POST',
      url: 'api/randoms',
      data: { choice: 'taco' }
    })
    .done(data => {
      let taco = data.data;
      let tacoMixin;
      let tacoCondiment;
      let mixinRecipe;
      let condimentRecipe;

      if (taco.mixin === undefined) {
        tacoMixin = '';
        mixinRecipe = '';
      } else {
        tacoMixin = taco.mixin.name;
        mixinRecipe = taco.mixin.recipe;
      }

      if (taco.condiment === undefined) {
        tacoCondiment = '';
        condimentRecipe = '';
      } else {
        tacoCondiment = taco.condiment.name;
        condimentRecipe = taco.condiment.recipe;
      }

      this.setState({
        name: taco.name,
        mixin: tacoMixin,
        condiment: tacoCondiment,
        base: taco.base_layer.name,
        recipeMixin: mixinRecipe,
        recipeCondiment: condimentRecipe,
        recipeBase: taco.base_layer.recipe
      });
    })
  }

  render() {
    return(
      <div className="taco">
        <h3>{this.state.name}</h3>
          <p><strong>Condiment:</strong> {this.state.condiment}<br />
            {this.state.recipeCondiment}
          </p>
          <p><strong>Mixin:</strong> {this.state.mixin}<br />
            {this.state.recipeMixin}
          </p>
          <p><strong>Base Layer:</strong> {this.state.base}<br />
            {this.state.recipeBase}
          </p>
      </div>
    );
  }
}

export default Taco;
