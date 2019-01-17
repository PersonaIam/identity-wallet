/**
 * Created by vladtomsa on 07/11/2018
 */
import React from 'react';
import { USER_ROLES } from 'constants/index';
import Switch from '@material-ui/core/Switch';
import FormControlLabel from '@material-ui/core/FormControlLabel';

export const UserRoleToggle = ({ input, label, disabled, t, ...custom}) => {
  const isChecked = input.value === USER_ROLES.NOTARY;

  const onChange = () => {
    const toChangeValue = input.value === USER_ROLES.NOTARY ? USER_ROLES.IDENTITY_USER : USER_ROLES.NOTARY;

    input.onChange(toChangeValue);
  };

  return (
    <FormControlLabel
      control={
        <Switch
          checked={isChecked}
          onChange={onChange}
          disabled={!!disabled}
          color="secondary"
        />
      }
      label={t(label)}
    />
  );
};

export default UserRoleToggle;

