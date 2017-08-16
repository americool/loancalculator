loanCalc.controller('mainController', ['$scope', function($scope) {
  $scope.showResults = false;


  $scope.forms = [
    {
      balance: "-",
      term: "-",
      rate: "-"
    }
  ]
  $scope.results = [];
  $scope.poolResult = [];

  $scope.calculate = function() {
    $scope.showResults = false;
    $scope.results = [];
    $scope.poolResult = [];
    createResults();
    createMonthlyResults();
    calculatePool();
    $scope.showResults = true;

  }

  $scope.addAnother = function() {
    $scope.forms.push(
      {
        balance: "-",
        term: "-",
        rate: "-"
      }
    )
  }

  createResults = () => {
    $scope.forms.forEach(function(loan) {
      $scope.results.push(
        {
          balance: loan.balance,
          months: loan.term,
          rate: loan.rate,
          monthlyResults: []
        }
      )
    });
  }

  createMonthlyResults = () => {
    $scope.results.forEach(function(loan){
      const totalMonthlyPayment =
      (loan.balance) * (loan.rate/1200) /
      (1-(1+loan.rate/1200)**(loan.months *-1))
      let previousRemaingBalance = loan.balance;



      for(x=0; x<loan.months; x++){
        let intrestPayment = previousRemaingBalance * (loan.rate/1200);
        let principalPayment = totalMonthlyPayment - intrestPayment;
        let remBalance = previousRemaingBalance - principalPayment;

        loan.monthlyResults.push( {
          month: x+1,
          interest: intrestPayment,
          principal: principalPayment,
          remBalance: remBalance
        })

        previousRemaingBalance = remBalance;
      }
    })
  }

  calculatePool = () => {
    $scope.results.forEach(function(loan){
      loan.monthlyResults.forEach(function(month){
        if ($scope.poolResult[month.month - 1]) {
          $scope.poolResult[month.month - 1] = {
            interest: $scope.poolResult[month.month - 1].interest + month.interest,
            principal: $scope.poolResult[month.month - 1].principal + month.principal,
            remBalance: $scope.poolResult[month.month - 1].remBalance + month.remBalance
          }
        }
        else {
          $scope.poolResult.push({
            interest: month.interest,
            principal: month.principal,
            remBalance: month.remBalance
          })
        }
      })
    })
  }



}]);
