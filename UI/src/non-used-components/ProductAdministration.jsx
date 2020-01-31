import React from "react";
import { AppDataContext } from "../context";
import Axios from "axios";

class ProductAdministrationComponent extends React.Component {
  static contextType = AppDataContext;

  constructor(props, context) {
    super(props, context);

    const isCreateMode = props.match.path === "/admin/dovanos/new";
    this.state = {
      mode: isCreateMode ? "create" : "edit-loading",
      title: "",
      image: "",
      forAdults: false,
      type: "",
      description: "",
      url: "http://localhost:8080"
      //url: "http://localhost:8081/dovanos"
    };
  }

  componentDidMount() {
    this.dovanosMayHaveLoaded();
  }

  componentDidUpdate() {
    this.dovanosMayHaveLoaded();
  }

  dovanosMayHaveLoaded() {
    if (this.context.dovanos === "loading") return;
    if (this.state.mode !== "edit-loading") return;
    const dovana = this.context.dovanos.find(
      dovana => String(dovana.id) === this.props.match.params.id
    );
    if (!dovana) {
      throw new Error("Neradau produkto");
    }
    this.setState({
      mode: "edit",
      id: dovana.id,
      title: dovana.title,
      image: dovana.image,
      type: dovana.type,
      forAdults: dovana.forAdults,
      description: dovana.description
    });
  }

  handleTitleChange = event => this.setState({ title: event.target.value });
  handleImageChange = event => this.setState({ image: event.target.value });
  handleTypeChange = event => this.setState({ type: event.target.value });
  handleForAdultsChange = event =>
    this.setState({ forAdults: event.target.checked });
  handleDescriptionChange = event =>
    this.setState({ description: event.target.value });

  saveProduct = () => {
    this.setState({ mode: "edit-saving" });

    Axios.put(`${this.state.url}/api/dovanos/${this.props.match.params.id}`, {
      title: this.state.title,
      description: this.state.description,
      img: this.state.image,
      forAdults: this.state.forAdults,
      type: this.state.type
    })
      .then(this.context.refreshProducts)
      .then(() => this.props.history.push("/admin"));
  };

  createProduct = () => {
    Axios.post(`${this.state.url}/api/dovanos`, {
      title: this.state.title,
      description: this.state.description,
      img: this.state.image,
      forAdults: this.state.forAdults,
      type: this.state.type
    })
      .then(this.context.refreshProducts)
      .then(() => this.props.history.push("/admin"));
  };

  handleSubmit = event => {
    event.preventDefault();

    if (this.state.mode === "edit") {
      this.saveProduct();
    } else if (this.state.mode === "create") {
      this.createProduct();
    } else if (this.state.mode === "edit-loading") {
      throw new Error("Not supposed to be possible to submit in edit-loading");
    } else {
      throw new Error(`Unfamiliar mode ${this.state.mode}`);
    }
  };

  render() {
    if (this.state.mode === "edit-loading") {
      return (
        <div className="container">
          <p>Preparing the edit screen...</p>
        </div>
      );
    }

    if (this.state.mode === "edit-saving") {
      return <div>Saving changes...</div>;
    }

    return (
      <div className="container">
        <div className="row">
          <div className="col-4">
            <form onSubmit={this.handleSubmit}>
              <div className="form-group">
                <label>
                  Pavadinimas
                  <input
                    type="text"
                    required="required"
                    className="form-control"
                    value={this.state.title}
                    onChange={this.handleTitleChange}
                  />
                </label>
              </div>
              <div className="form-group">
                <label>
                  Aprašymas
                  <input
                    type="text"
                    id="description"
                    required="required"
                    className="form-control"
                    value={this.state.description}
                    onChange={this.handleDescriptionChange}
                  />
                </label>
              </div>
              <div className="form-group">
                <label>
                  Nuoroda į paveikslėlį
                  <input
                    type="url"
                    required="required"
                    className="form-control"
                    value={this.state.image}
                    onChange={this.handleImageChange}
                  />
                </label>
              </div>
              <div className="form-group">
                <label>
                  Tipas
                  <input
                    type="text"
                    required="required"
                    className="form-control"
                    value={this.state.type}
                    onChange={this.handleTypeChange}
                  />
                </label>
              </div>
              <div className="form-group">
                <label>
                  Suaugusiems
                  <input
                    type="checkbox"
                    className="form-control"
                    value={this.state.forAdults}
                    onChange={this.handleForAdultsChange}
                  />
                </label>
              </div>

              <button type="submit" className="btn btn-info">
                Išsaugoti
              </button>
              <button
                className="btn btn-light mx-2"
                onClick={() => this.props.history.push("/admin")}
              >
                Atšaukti
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default ProductAdministrationComponent;
