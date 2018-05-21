var currentUser = null;

(function ($) {
    'use strict';

    function createPet(pet) {
      return $.ajax({
        type: 'POST',
        url: '/api/pet',
        data: pet
      })
    }

    function getCurrentUser() {
      return $.get('/api/currentUser');
    }

    $('#addPetBtn').click(function () {
        console.log('inside click event');
        $('#addPetModal').addClass('is-active');

    }); 

    $('#cancel').click( () => {
      //event.preventDefault();
      $('#addPetModal').removeClass('is-active');
    });

    $('#save').click( () => {
      getCurrentUser().then((currentUser) => {
        var pet = {
          name: $('#namefield').val().trim(),
          type: $('#typefield').val().trim(),
          breed: $('#breedfield').val().trim(),
          about: $('#aboutfield').val().trim(),
          UserId: currentUser.id
        };

        createPet(pet).done((data) => {
          console.log(data);
        });
        
        $('#addPetModal').removeClass('is-active');
      });
    });

})($);