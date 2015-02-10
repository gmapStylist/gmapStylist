
        <div class="modal-header">
            <h3 class="modal-title">Select feature and element type</h3>
        </div>
        <div class="modal-body">


        <div class="row">
            <div class="col-md-4">
                <select ng-change="selectAction(1,1)" size="8" class="form-control" ng-model="selectedFeatureType.Level0" ng-options="feature.label for feature in FeatureTypes track by feature.value" required>

                </select>
            </div>

            <div  class="col-md-4">
                <select ng-change="selectAction(1,2)" size="8"  class="form-control" ng-model="selectedFeatureType.Level1" ng-options="feature.label for feature in selectedFeatureType.Level0.Level1 track by feature.value"><option style="display:none" value="">select a feature</option></select>
            </div>

            <div class="col-md-4">
                <select ng-change="selectAction(1,3)" size="8"  class="form-control" ng-model="selectedFeatureType.Level2" ng-options="feature.label for feature in selectedFeatureType.Level1.Level2 track by feature.value"><option style="display:none" value="">select a feature</option></select>
            </div>
        </div>

Feature Type: <b>{{ featureType }}</b>

<hr/>

        <div class="row">
            <div class="col-md-4">
                <select ng-change="selectAction(2,1)" size="8" class="form-control" ng-model="selectedElementType.Level0" ng-options="element.label for element in ElementTypes track by element.value" required>

                </select>
            </div>

            <div class="col-md-4">
                <select ng-change="selectAction(2,2)" size="8" class="form-control" ng-model="selectedElementType.Level1" ng-options="element.label for element in selectedElementType.Level0.Level1 track by element.value"><option style="display:none" value="">select an element</option></select>
            </div>

            <div class="col-md-4">
                <select ng-change="selectAction(2,3)" size="8"  class="form-control" ng-model="selectedElementType.Level2" ng-options="element.label for element in selectedElementType.Level1.Level2 track by element.value"><option style="display:none" value="">select an element</option></select>
            </div>
        </div>

Element Type: <b>{{ elementType }}</b>


        </div>
        <div class="modal-footer">
            <button class="btn btn-primary" ng-click="ok()">OK</button>
            <button class="btn btn-warning" ng-click="cancel()">Cancel</button>
        </div>
