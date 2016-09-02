app.factory("config", config);

function config(){

  return {
    'choices': {
      'name': 'Consequences',
      'fields': {
        'Reputation': {
          'type': 'number',
          'value': 0
        }
      }
    }
  };

}
