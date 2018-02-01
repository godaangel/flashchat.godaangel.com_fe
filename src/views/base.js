export default{
  data(){
    return {};
  },
  methods: {
    setSessionStorage(key,value){
      window.sessionStorage[key] = value;
    }
  }
}