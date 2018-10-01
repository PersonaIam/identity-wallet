import React, { Component } from 'react';
import RichTextEditor, { createEmptyValue, createValueFromString } from 'react-rte';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import {translate} from "react-i18next";
import { withStyles } from '@material-ui/core/styles';

const styles = (theme) => {
  return {
    rteContainer: {
      '& button': {
        border: 'none',
        boxShadow: theme.shadows[1],
        borderRadius: '4px !important',
        marginRight: '4px !important',
        color: 'rgba(0,0,0,.4) !important',
        '& span': {
          opacity: 0.8,
        },
      },
      '& select': {
        boxShadow: theme.shadows[1],
        color: 'rgba(0,0,0,0.4) !important',
        outline: 'none !important',
      },
    },
    rteEditorContent: {
      minHeight: 70,
    },
    rteToolBar: {
      margin: '0 !important',
      padding: '6px !important',
      '&>div': {
        marginTop: '5px !important',
      },
      '& [class*="isActive"]': {
        background: `linear-gradient(45deg, ${theme.palette.primary.light}, ${theme.palette.primary.main}) !important`,
        boxShadow: theme.shadows[7],
      },
      '& [class*="Dropdown__value"]': {
        borderColor: 'rgba(0,0,0,0) !important',
      },
    }
  }
};

const FORMAT = 'html';
const toolbarConfig = {
  // Optionally specify the groups to display (displayed in the order listed).
  display: ['INLINE_STYLE_BUTTONS', 'BLOCK_TYPE_BUTTONS', 'LINK_BUTTONS', 'BLOCK_QUOTE', 'BLOCK_TYPE_DROPDOWN'],
  INLINE_STYLE_BUTTONS: [
    { label: 'Bold', style: 'BOLD', className: 'custom-css-class' },
    { label: 'Italic', style: 'ITALIC' },
    { label: 'Underline', style: 'UNDERLINE' },
  ],
  BLOCK_TYPE_DROPDOWN: [
    { label: 'Normal', style: 'unstyled' },
    { label: 'Heading Large', style: 'header-one' },
    { label: 'Heading Medium', style: 'header-two' },
    { label: 'Heading Small', style: 'header-three' },
  ],
  BLOCK_TYPE_BUTTONS: [
    { label: 'UL', style: 'unordered-list-item' },
    { label: 'OL', style: 'ordered-list-item' },
  ],
};

class RenderRichTextField extends Component {
  state = {
    value: createEmptyValue(),
  };

  componentDidMount() {
    const { input: { value } } = this.props;

    this.setState({ value: createValueFromString(value, FORMAT) });
  }

  onChange = (value) => {
    const { input: { onChange, onBlur } } = this.props;

    this.setState({ value }, () => {
      onChange(value.toString('html'));
      onBlur();
    });
  };

  render() {
    const { classes, meta, label, required, t } = this.props;
    const  { touched, error } = meta;

    return (
      <div className={ classes.rteContainer }>
        <InputLabel required={required} error={!!(touched && error)}>{ label }</InputLabel>
        <RichTextEditor
          value={ this.state.value }
          onChange={ this.onChange }
          toolbarConfig={ toolbarConfig }
          editorClassName={ classes.rteEditorContent }
          toolbarClassName={ classes.rteToolBar }
        />
        {
          !!(touched && error) ?
            <FormControl error={true} fullWidth>
              <FormHelperText>{ t(error) }</FormHelperText>
            </FormControl> : null
        }
      </div>
    );
  };
}

export default withStyles(styles)(translate('common')(RenderRichTextField));
