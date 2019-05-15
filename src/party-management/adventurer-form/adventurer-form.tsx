import React from 'react';
import { AdventurerClass } from '../models/adventurer-class/adventurer-class.type';
import { map } from 'lodash-es';
import { AdventurerFormData } from '../models/adventurer/adventurer.type';
import { Formik, FormikActions, Form, Field, FieldProps } from 'formik';
import memoizeOne from 'memoize-one';
import { string, object, number, setLocale } from 'yup';

interface FormValues {
  name: string;
  adventurerClass: string;
  level: number;
}

// type FormKeys = keyof FormValues;
// type FormErrors = DictionaryWithKeys<FormKeys, string>;

interface Props {
  adventurerClasses: AdventurerClass[];
  onSubmit(adventurer: AdventurerFormData): void; // should we return a promise????
}

interface State {
  initialValues: FormValues;
}

const validationSchema = object().shape<FormValues>({
  name: string().required('Please enter a name'),
  adventurerClass: string().required('Please select a class'),
  level: number().required('This is a required field'),
});

// can also replace this with withFormik()
export class AdventurerForm extends React.PureComponent<Props, State> {

  state = {
    initialValues: {
      name: '',
      adventurerClass: '',
      level: 1,
    }
  };

  static getDerivedStateFromProps(nextProps: Props, prevState: State): Partial<State> | null {
    if (!prevState.initialValues.adventurerClass) {
      return {
        initialValues: {
          ...prevState.initialValues,
          adventurerClass: nextProps.adventurerClasses[0].id,
        },
      };
    }
    return null;
  }

  submit = (values: FormValues, actions: FormikActions<FormValues>) => {
    this.props.onSubmit({
      name: values.name,
      classes: [values.adventurerClass],
      level: values.level,
    });
    actions.resetForm();
  }

  render(): React.ReactNode {
    return (
      <Formik
        validationSchema={validationSchema}
        initialValues={this.state.initialValues}
        onSubmit={this.submit}
        render={this.renderForm}>
      </Formik>
    );
  }

  renderForm = () => {
    return (
      <Form>
        <Field name="name" render={this.renderNameField} />
        <Field name="adventurerClass" render={this.renderSelectField} />
        <Field name="level" render={this.renderLevelField} />
        <button type="submit">Add Adventurer</button>
      </Form>
    );
  }

  renderNameField = ({ field, form, }: FieldProps<FormValues>) => {
    return (
      <label>
        Name
        <input type="text" { ...field } placeholder="Name" />
        <small>
          {form.touched.name && form.errors.name && form.errors.name}
        </small>
      </label>
    );
  }

  renderOptions = memoizeOne((classes: AdventurerClass[]) => {
    return map(classes, c => {
      return <option value={c.id} key={c.id}>{c.title}</option>;
    });
  });

  renderSelectField = ({ field, form }: FieldProps<FormValues>) => {
    const options = this.renderOptions(this.props.adventurerClasses);
    return (
      <label>
        Class
        <select { ...field }>
          {options}
        </select>
        <small>
          {form.touched.adventurerClass && form.errors.adventurerClass && form.errors.adventurerClass}
        </small>
      </label>
    );
  }

  renderLevelField = ({ field, form }: FieldProps<FormValues>) => {
    return (
      <label>
        Level
        <input type="number" { ...field } />
        <small>
          {form.touched.level && form.errors.level && form.errors.level}
        </small>
      </label>
    );
  }
}
