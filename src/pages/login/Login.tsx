import Cookies from 'js-cookie'
import {
  Box,
  Flex,
  Text,
  TextInput,
  PasswordInput,
  Button,
  Stack,
} from "@mantine/core";
import { useNavigate } from "react-router-dom";
import { loginSchema, type LoginFormData } from "./schema/loginSchema";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { loginService, type loginPayload } from "./services/login.service";
import toast from "react-hot-toast";
import { useUserStore } from "../../store/useUserStore";
import { useUserProfile } from '../../hooks/useUserProfile';

const LoginPage = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });
  const {setData} = useUserStore();
  const {refetch:refetchProfile} = useUserProfile();
  const loginMuatation = useMutation({
    mutationFn: (payload: loginPayload) => loginService(payload),
    onSuccess: (data) => {
      console.log("Data ", data)
      if(data?.payload?.success){
        refetchProfile();
      console.log("Login Success", data);
      Cookies.set('access_token', data?.payload?.data?.access_token);
      Cookies.set('refresh_token', data?.payload?.data?.refresh_token);
      navigate("/chat");
      toast.success(data?.payload?.message);
      setData(data?.payload?.data)
      }
      else {
        console.log("sdadsad",data?.payload?.message);
        toast.error('dsad');
      }

    },
    onError: (err) => {
      toast.error("Login Failed");
    }
  })

  const onSubmit = (data: LoginFormData) => {
         loginMuatation.mutate(data);
  };
  return (
    <Flex
      h="100vh" 
      align="center"
      justify="center"
      style={{
        position: "relative",
        background: "#0f0f0f",
        overflow: "hidden",
      }}
    >
      {/* 🔮 Purple Glow Background */}
      <Box
        style={{
          position: "absolute",
          width: 300,
          height: 300,
          background: "radial-gradient(circle, #7c3aed55, transparent 70%)",
          top: "-80px",
          left: "-80px",
          filter: "blur(60px)",
        }}
      />

      <Box
        style={{
          position: "absolute",
          width: 300,
          height: 300,
          background: "radial-gradient(circle, #a855f755, transparent 70%)",
          bottom: "-80px",
          right: "-80px",
          filter: "blur(60px)",
        }}
      />

      {/* 💳 Card */}
      <Box onSubmit={handleSubmit(onSubmit)} component="form"
        p="xl"
        style={{
          width: 460,
          background: "#151515",
          border: "1px solid #222",
          borderRadius: 14,
          backdropFilter: "blur(10px)",
          boxShadow: "0 0 40px rgba(124,58,237,0.15)",
          zIndex: 1,
        }}
      >
        <Stack gap="md">
          {/* Logo */}
          <Box
            mx="auto"
            mb={5}
            style={{
              width: 60,
              height: 60,
              borderRadius: "50%",
              background: "linear-gradient(135deg, #7c3aed, #a855f7)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 24,
              fontWeight: 700,
              color: "#fff",
            }}
          >
            💬
          </Box>

          {/* Title */}
          <Text size="xl" fw={700} ta="center" c="white">
            Welcome Back
          </Text>

          <Text size="sm" c="dimmed" ta="center">
            Login to continue chatting
          </Text>

          {/* Inputs */}
<Stack> 
            <TextInput {...register("email")}
            label="Email"
            placeholder="Enter your email"
            styles={{
              input: {
                background: "#0f0f0f",
                border: "1px solid #222",
                color: "#fff",
              },
              label: { color: "#aaa" },
            }}
          />
          {errors.email && <Text color="red">{errors.email.message}</Text>}
</Stack>

<Stack>
<Controller control={control} name="password" render={({field})=>(            <PasswordInput
            label="Password"
            placeholder="Enter your password"
            onChange={(e) => {
              field.onChange(e?.target?.value);
            }}
            styles={{
              input: {
                background: "#0f0f0f",
                border: "1px solid #222",
                color: "#fff",
              },
              label: { color: "#aaa" },
            }}
          />)}  />
          {errors.password && <Text color="red">{errors.password.message}</Text>}
</Stack>

          {/* Button */}
          <Button loading={loginMuatation.isPending} type="submit"
            fullWidth
            mt="sm"
            radius="xl"
            style={{
              background: "linear-gradient(135deg, #7c3aed, #a855f7)",
              border: "none",
            }}
          >
            Login
          </Button>

          {/* Footer */}
       <Flex justify={'space-between'} >
           <Text size="xs" c="dimmed" ta="center">
            Don’t have an account?{" "}
            <span onClick={()=>{
                navigate('/register')
            }} style={{ color: "#a855f7", cursor: "pointer" }}>
              Sign up
            </span>
          </Text>
             <Text style={{cursor:'pointer'}} onClick={()=>{navigate('/forgot-password')}} size="xs" c="#a855f7" ta="center">
            Forgot your account?{" "}
            
          </Text>
       </Flex>
        </Stack>
      </Box>
    </Flex>
  );
};

export default LoginPage;