import { Meteor } from 'meteor/meteor';
import { Roles } from 'meteor/alanning:roles';

Accounts.onCreateUser((options, user) => {
  if (options.profile) {
    user.profile = options.profile;
  }

  if (options.role) {
    Roles.addUsersToRoles(user._id, options.role);
  }

  return user;
});