import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { createPost } from '../actions';

class PostsNew extends Component {
  renderField(field) {
    // destructuring touched and error from field.meta.touched
    const { meta: { touched, error } } = field;
    const divClassName = `form-group ${touched && error ? 'has-danger' : ''}`;
    
    return (
      <div className={divClassName}>
        <label htmlFor={field.id}>{field.label}</label>
        <input
          className="form-control"
          id={field.id}
          type="text"
          {...field.input}
        />
        <div className="text-help">
          {touched ? error : ''}
        </div>
      </div>
    );
  }

  onSubmit(values) {
    this.props.createPost(values, () => {
      this.props.history.push('/');
    });
  }
  
  render() {
    // handleSubmit does the validation and if all is fine we go into onSubmit
    const { handleSubmit } = this.props;

    return (
      <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
        <Field
          label="Title"
          id="title"
          name="title"
          component={this.renderField}
        />
        <Field
          label="Categories"
          id="categories"
          name="categories"
          component={this.renderField}
        />
        <Field
          label="Content"
          name="content"
          id="content"
          component={this.renderField}
        />
        <button type="submit" className="btn btn-primary">Submit</button>
        <Link to="/" className="btn btn-danger">Cancel</Link>
      </form>
    );
  }
}

function validate(values) {
  const errors = {}; // if errors stays empty, we're good

  if (!values.title) {
    errors.title = 'Enter a title!';
  }

  if (!values.categories) {
    errors.categories = 'Enter some categories!';
  }

  if (!values.content) {
    errors.content = 'Enter some content!';
  }

  return errors;
}

export default reduxForm({
  validate,
  form: 'PostsNewForm',
})(
  connect(null, { createPost })(PostsNew)
);
