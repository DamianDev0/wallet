import {useNavigation as useReactNavigation} from '@react-navigation/native';
import type {NativeStackNavigationProp} from '@react-navigation/native-stack';
import { PublicNavigationRoutes } from '../types/public-routes.type';
import { PrivateNavigationRoutes } from '@type/private-routes.type';


const useNavigationHook = () => {
  return useReactNavigation<NativeStackNavigationProp<PublicNavigationRoutes & PrivateNavigationRoutes>>();
};

export default useNavigationHook;