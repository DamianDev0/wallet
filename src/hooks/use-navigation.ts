import {useNavigation as useReactNavigation} from '@react-navigation/native';
import type {NativeStackNavigationProp} from '@react-navigation/native-stack';
import { PublicNavigationRoutes } from '../types/public-routes.type';


const useNavigationHook = () => {
  return useReactNavigation<NativeStackNavigationProp<PublicNavigationRoutes>>();
};

export default useNavigationHook;