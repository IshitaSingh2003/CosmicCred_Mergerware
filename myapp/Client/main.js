import { Template } from 'meteor/templating';
import { Meteor } from 'meteor/meteor';
import { Roles } from 'meteor/alanning:roles';
import { FlowRouter } from 'meteor/ostrio:flow-router-extra';

Template.register.events({
  'submit form': (event, instance) => {
    event.preventDefault();

    const email = event.target.email.value;
    const password = event.target.password.value;
    const role = event.target.role.value;

    Accounts.createUser({
      email,
      password,
      profile: {},
      role: [role],
    }, (err) => {
      if (!err) {
        FlowRouter.go('/login');
      }
    });
  },
});

Template.body.onCreated(function () {
  if (!Meteor.userId()) {
    FlowRouter.go('/register');
  }
});

Template.body.helpers({
  isInRole() {
    return Roles.userIsInRole(Meteor.userId(), ['admin', 'borrower', 'lender']);
  },
});

// Add more routes for borrower, lender, and admin pages