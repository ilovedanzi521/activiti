

var NodeConfController = [ '$rootScope','$modal', '$scope', '$http', '$route', '$location',
    function ($rootScope,$modal, $scope, $http, $route, $location) {
        $scope.isEditAllNode_nodeUser=($scope.isEditAllNode_nodeUser==1?1:0)
        $scope.node={};

        $scope.editAllNodes = function (e) {
            $scope["isEditAllNode_" + e] ? $scope["isEditAllNode_" + e] = !1 : (jQuery(".collapse.in").not("." + e).collapse("hide"), $scope["isEditAllNode_" + e] = !0);
        };
        //modify by wanglei 判断node类型
        $scope.isUserTaskNode = function () {
            return $scope.selectedItem && -1 == "Global,InclusiveGateway,ExclusiveGateway,CallActivity,".indexOf($scope.selectedItem.nodeType);
            // return $scope.selectedItem.title != undefined && $scope.selectedItem.title != null && $scope.selectedItem.title.length > 0 && -1 == "Global,InclusiveGateway,ExclusiveGateway,CallActivity,".indexOf($scope.selectedItem.nodeType);
        };
        //modify by wanglei end

        if ($scope.isUserTaskNode()) {
            //debugger;
            $scope.node.nodeName="任务";
            $scope.node.nodeId="UserTask";
        };
        $scope.addNodeUserCondition = function () {
            var s = {
                passData: $scope.node,
                width: 1e3,
                height: 600,
                btnAlign: "c",
                title: "人员条件配置",
                url: "extend/configuration/custom/userConditionDialog.html",
                ok: function (e, t) {
                    var i = t.getData();
                    i && (scope.$apply(function () {
                        null != n ? $scope.currentUserCondtion[n] = i : $scope.currentUserCondtion && $scope.currentUserCondtion.push(i)
                    }), t.parent.layer.close(e))
                }
            };
            $scope.open(s)
        };
        $scope.open = function () {
            var modalInstance = $modal.open({
                weight:500,
                height:600,
                title: "人员条件配置",
                templateUrl: "extend/configuration/custom/userConditionDialog.html",
                resolve: {
                    node: function () {
                        return $scope.node;
                    }
                }
            });
            modalInstance.result.then(function (result) {
                console.log(result);
            }, function (reason) {
                console.log(reason);//点击空白区域，总会输出backdrop click，点击取消，则会暑促cancel
                $log.info('Modal dismissed at: ' + new Date());
            });
        }

}];


